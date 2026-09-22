/**
 * Seed Firestore from local TypeScript content.
 *
 * Usage (loads .env.local automatically):
 *   pnpm seed
 *
 * Requires FIREBASE_ADMIN_* and ideally SUPER_ADMIN_EMAIL + SUPER_ADMIN_PASSWORD.
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { posts } from "../src/content/posts";
import { products } from "../src/content/products";
import { site } from "../src/content/site";
import {
  adminAuth,
  adminDb,
  ensureFirebaseFromEnv,
} from "./seed-firebase";

function loadEnvFile(filename: string) {
  const path = resolve(process.cwd(), filename);
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

async function main() {
  ensureFirebaseFromEnv();
  const db = adminDb();

  console.log(`Seeding ${posts.length} posts…`);
  for (const post of posts) {
    await db
      .collection("posts")
      .doc(post.slug)
      .set(
        {
          ...post,
          published: true,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
  }

  console.log(`Seeding ${products.length} products…`);
  for (const product of products) {
    await db
      .collection("products")
      .doc(product.id)
      .set(
        {
          ...product,
          published: true,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
  }

  console.log("Seeding site/settings…");
  await db.collection("site").doc("settings").set(
    {
      name: site.name,
      tagline: site.tagline,
      fullName: site.fullName,
      description: site.description,
      email: site.email,
      footerTitle: site.footerTitle,
      footerMeta: site.footerMeta,
      reach: site.reach,
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );

  const email = process.env.SUPER_ADMIN_EMAIL?.toLowerCase();
  const password = process.env.SUPER_ADMIN_PASSWORD;
  if (email && password) {
    console.log(`Ensuring super admin ${email}…`);
    let user;
    try {
      user = await adminAuth().getUserByEmail(email);
    } catch {
      user = await adminAuth().createUser({
        email,
        password,
        displayName: "Super Admin",
      });
    }
    await db.collection("users").doc(user.uid).set(
      {
        email,
        displayName: user.displayName || "Super Admin",
        role: "super_admin",
        permissions: [],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      { merge: true },
    );
  } else {
    console.log(
      "Skip super admin creation (set SUPER_ADMIN_EMAIL + SUPER_ADMIN_PASSWORD to create).",
    );
  }

  console.log("Seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
