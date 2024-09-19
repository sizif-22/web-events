"use client";
import { useState, useEffect } from "react";
import { fetchEvent, fetchJoinedData } from "@/app/firebase/firestore.events";
import Loading from "@/app/components/loading/loading";
import { exportToExcel } from "@/xlax/xlax";
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [eventLink, setEventLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [joined, setJoined] = useState([]);
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  if (event) {
    console.log("form : ", event.form);
  }
  console.log("data : ", joined);
  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const res = await fetchEvent(id);
        const res2 = await fetchJoinedData(id);
        if (res && res2) {
          setEvent(res);
          setJoined(res2);
          setEventLink(`${window.location.origin}/events/${id}`);
          setLoading(false);
        }
      }
    };
    fetch();
  }, []);
  const handleClick = () => {
    exportToExcel(event.form, joined, id);
    // exportToExcel("eventFile");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(eventLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const navigateToEvent = () => {
    window.open(eventLink, "_blank");
  };

  if (loading) {
    return <Loading />;
  }

  // Format the date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Event Dashboard</h1>
        <div style={styles.content}>
          <h2 style={styles.eventTitle}>{event.title}</h2>
          <p style={styles.date}>Date: {formatDate(event.date)}</p>
          <div style={styles.linkContainer}>
            <label htmlFor="eventLink" style={styles.label}>
              Event Link
            </label>
            <div style={styles.inputGroup}>
              <input
                id="eventLink"
                value={eventLink}
                readOnly
                style={styles.input}
              />
              <button onClick={copyLink} style={styles.copyButton}>
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <button onClick={navigateToEvent} style={styles.navigateButton}>
            Go to Event Page
          </button>
          <button onClick={handleClick} style={styles.navigateButton}>
            Export
          </button>
          {event.description && (
            <div style={styles.descriptionContainer}>
              <h3 style={styles.descriptionTitle}>Description</h3>
              <p style={styles.description}>{event.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    padding: "40px 20px",
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
    color: "#333",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  eventTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "10px",
  },
  date: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
  linkContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  copyButton: {
    padding: "10px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  navigateButton: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  descriptionContainer: {
    marginTop: "20px",
  },
  descriptionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
  },
};

export default Dashboard;
