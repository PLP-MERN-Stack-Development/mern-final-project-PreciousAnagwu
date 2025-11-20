// components/ReportForm.tsx
import { useState } from "react";

interface ReportFormProps {
  onSuccess?: () => void;
}

export default function ReportForm({ onSuccess }: ReportFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState(""); // default



  const getLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
      alert(`Location acquired: ${pos.coords.latitude}, ${pos.coords.longitude}`);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lat || !lng || !file) return alert("Location and image are required!");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("lat", lat.toString());
    formData.append("lng", lng.toString());
    formData.append("category", "pollution"); // addition
    formData.append("severity", "medium"); 
    formData.append("image", file);

    
    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        body: formData,
        
      });

      if (res.ok) {
        alert("Report submitted!");
        setTitle("");
        setDescription("");
        setFile(null);
        setLat(null);
        setLng(null);
        onSuccess?.(); // close dialog
      } else {
        alert("Failed to submit report");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        />

         <select
         className={`border p-2 rounded text-muted-foreground ${!severity ? "text-muted-foreground" : "text-foreground"}`}
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        required
        >
        <option value="" disabled>
          Select severity </option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
      
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
      <button
        type="button"
        onClick={getLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Get Current Location
      </button>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}
