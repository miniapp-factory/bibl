"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BibleStudy() {
  const [reference, setReference] = useState("");
  const [verse, setVerse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchVerse = async () => {
    if (!reference.trim()) return;
    setLoading(true);
    try {
      // Simple demo: use a public Bible API (e.g., https://bible-api.com/)
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}`);
      const data = await res.json();
      if (data && data.text) {
        setVerse(data.text);
      } else {
        setVerse("Verse not found.");
      }
    } catch {
      setVerse("Error fetching verse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Bible Verse Study</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Input
          placeholder="e.g., John 3:16"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
        <Button onClick={fetchVerse} disabled={loading}>
          {loading ? "Loading…" : "Fetch Verse"}
        </Button>
        {verse && (
          <div className="mt-4 p-2 bg-muted rounded">
            <p>{verse}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
