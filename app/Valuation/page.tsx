"use client";

import { useState } from "react";
import { calculateValuation, ValuationInput, ValuationResult } from "./actions";

const ZONES: Record<string, Record<string, string[]>> = {
  "San Salvador": {
    "San Salvador": ["Colonia Escalón", "San Benito", "Colonia Médica"],
    Soyapango: ["Residencial Soyapango"],
    Mejicanos: ["Col. Zacamil"],
  },
  "La Libertad": {
    "Antiguo Cuscatlán": ["Jardines de Guadalupe", "Maquilishuat"],
    "Santa Tecla": ["Residencial Santa Tecla", "Ciudad Merliot"],
    Zaragoza: ["Residencial Zaragoza"],
  },
  "Santa Ana": {
    "Santa Ana": ["Colonia Flor Blanca", "Centro"],
    Chalchuapa: ["Residencial Chalchuapa"],
    Metapán: ["Centro Metapán"],
  },
};

const defaultForm: ValuationInput = {
  department: "",
  municipality: "",
  zone: "",
  type: "house",
  condition: "good",
  areaM2: 0,
  landAreaM2: null,
  bedrooms: 3,
  bathrooms: 2,
  parking: 1,
  hasPool: false,
  hasSecurity: false,
  hasGarden: false,
  hasAC: false,
};

export default function ValuationPage() {
  const [form, setForm] = useState<ValuationInput>(defaultForm);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const municipalities = form.department ? Object.keys(ZONES[form.department] || {}) : [];
  const zones = form.municipality ? ZONES[form.department]?.[form.municipality] || [] : [];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
      };
      // Reset dependientes
      if (name === "department") { updated.municipality = ""; updated.zone = ""; }
      if (name === "municipality") { updated.zone = ""; }
      return updated;
    });
  }

  async function handleSubmit() {
    if (!form.department || !form.municipality || !form.zone || !form.areaM2) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }
    setLoading(true);
    try {
      const res = await calculateValuation(form);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert("Error al calcular. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Valuación de Propiedad</h1>

      {/* Ubicación */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.75rem", fontSize: "1rem", opacity: 0.7 }}>Ubicación</h2>

        <label>Departamento *</label>
        <select name="department" value={form.department} onChange={handleChange} style={selectStyle}>
          <option value="">Seleccionar</option>
          {Object.keys(ZONES).map((d) => <option key={d}>{d}</option>)}
        </select>

        <label>Municipio *</label>
        <select name="municipality" value={form.municipality} onChange={handleChange} style={selectStyle} disabled={!form.department}>
          <option value="">Seleccionar</option>
          {municipalities.map((m) => <option key={m}>{m}</option>)}
        </select>

        <label>Zona / Colonia *</label>
        <select name="zone" value={form.zone} onChange={handleChange} style={selectStyle} disabled={!form.municipality}>
          <option value="">Seleccionar</option>
          {zones.map((z) => <option key={z}>{z}</option>)}
        </select>
      </section>

      {/* Detalles */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.75rem", fontSize: "1rem", opacity: 0.7 }}>Detalles</h2>

        <label>Tipo de propiedad</label>
        <select name="type" value={form.type} onChange={handleChange} style={selectStyle}>
          <option value="house">Casa</option>
          <option value="apartment">Apartamento</option>
          <option value="land">Terreno</option>
        </select>

        <label>Condición</label>
        <select name="condition" value={form.condition} onChange={handleChange} style={selectStyle}>
          <option value="new">Nueva</option>
          <option value="good">Buena</option>
          <option value="fair">Regular</option>
          <option value="needs_work">Necesita trabajo</option>
        </select>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label>Área construcción (m²) *</label>
            <input name="areaM2" type="number" value={form.areaM2 || ""} onChange={handleChange} style={inputStyle} placeholder="ej: 150" />
          </div>
          <div>
            <label>Área terreno (m²)</label>
            <input name="landAreaM2" type="number" value={form.landAreaM2 || ""} onChange={handleChange} style={inputStyle} placeholder="ej: 200" />
          </div>
          <div>
            <label>Habitaciones</label>
            <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} style={inputStyle} min={1} />
          </div>
          <div>
            <label>Baños</label>
            <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} style={inputStyle} min={1} />
          </div>
          <div>
            <label>Parqueos</label>
            <input name="parking" type="number" value={form.parking} onChange={handleChange} style={inputStyle} min={0} />
          </div>
        </div>
      </section>

      {/* Amenidades */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "0.75rem", fontSize: "1rem", opacity: 0.7 }}>Amenidades</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          {[
            { name: "hasPool", label: "Piscina (+8%)" },
            { name: "hasSecurity", label: "Seguridad (+5%)" },
            { name: "hasGarden", label: "Jardín (+3%)" },
            { name: "hasAC", label: "Aire acondicionado (+4%)" },
          ].map(({ name, label }) => (
            <label key={name} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                name={name}
                checked={form[name as keyof ValuationInput] as boolean}
                onChange={handleChange}
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      {/* Botón */}
      <button onClick={handleSubmit} disabled={loading} style={buttonStyle}>
        {loading ? "Calculando..." : "Calcular Valuación"}
      </button>

      {/* Resultado */}
      {result && (
        <div style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid #333", borderRadius: 8 }}>
          <h2 style={{ marginBottom: "1rem" }}>Estimado de Valuación</h2>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4ade80" }}>
            {fmt(result.estimatedValue)}
          </div>
          <div style={{ marginTop: "0.5rem", opacity: 0.7 }}>
            Rango: {fmt(result.estimatedMin)} — {fmt(result.estimatedMax)}
          </div>
          <div style={{ marginTop: "0.25rem", opacity: 0.7 }}>
            Precio por m²: {fmt(result.pricePerM2)}
          </div>
        </div>
      )}
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "0.5rem",
  marginBottom: "0.75rem",
  marginTop: "0.25rem",
  background: "#1a1a1a",
  color: "#ededed",
  border: "1px solid #333",
  borderRadius: 6,
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "0.5rem",
  marginTop: "0.25rem",
  background: "#1a1a1a",
  color: "#ededed",
  border: "1px solid #333",
  borderRadius: 6,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  background: "#4ade80",
  color: "#000",
  border: "none",
  borderRadius: 6,
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
};