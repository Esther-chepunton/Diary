import fs from "fs";
import path from "path";

const entriesFilePath = path.join(process.cwd(), "entries.json");

const getEntries = () => {
  try {
    const data = fs.readFileSync(entriesFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const saveEntries = (entries) => {
  try {
    fs.writeFileSync(entriesFilePath, JSON.stringify(entries, null, 2));
  } catch (err) {
    console.error(err);
  }
};

export async function GET(request) {
  return new Response(JSON.stringify(getEntries()), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const entries = getEntries();
  const newEntry = await request.json();
  const entryIndex = entries.findIndex((entry) => entry.id === newEntry.id);
  if (entryIndex >= 0) {
    entries[entryIndex] = newEntry;
  } else {
    entries.push(newEntry);
  }
  saveEntries(entries);
  return new Response(JSON.stringify(newEntry), { status: 200 });
}

export async function DELETE(request) {
  const entries = getEntries();
  const { id } = await request.json();
  const updatedEntries = entries.filter((entry) => entry.id !== id);
  saveEntries(updatedEntries);
  return new Response(
    JSON.stringify({ message: "Entry deleted successfully" }),
    { status: 200 }
  );
}
