import fs from "fs";
import path from "path";

const filePath = path.resolve("./app/data/entries.json");

export async function GET() {
  const data = fs.readFileSync(filePath);
  return new Response(data, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const entries = await request.json();
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
  return new Response("Entries updated successfully");
}

export async function DELETE(request) {
  const entries = await request.json();
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
  return new Response("Entry deleted successfully");
}
