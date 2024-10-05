import { useState, useEffect } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

interface DroneData {
  image_id: string;
  timestamp: string;
  latitude: string;
  longitude: string;
  altitude_m: number;
  heading_deg: number;
  file_name: string;
  camera_tilt_deg: number;
  focal_length_mm: number;
  iso: number;
  shutter_speed: string;
  aperture: string;
  color_temp_k: number;
  image_format: string;
  file_size_mb: number;
  drone_speed_mps: number;
  battery_level_pct: number;
  gps_accuracy_m: number;
  gimbal_mode: string;
  subject_detection: string;
  image_tags: Array<string>;
}

const Table = () => {
  const [tableData, setTableData] = useState<Array<any>>([]);

  const columns: { label: string; accessor: string; sortable: boolean }[] = [
    { label: "Image ID", accessor: "image_id", sortable: true },
    { label: "Timestamp", accessor: "timestamp", sortable: true },
    { label: "Latitude", accessor: "latitude", sortable: true },
    { label: "Longitude", accessor: "longitude", sortable: true },
    { label: "Altitude (m)", accessor: "altitude_m", sortable: true },
    { label: "Heading (deg)", accessor: "heading_deg", sortable: true },
    { label: "File Name", accessor: "file_name", sortable: true },
    { label: "Camera Tilt (deg)", accessor: "camera_tilt_deg", sortable: true },
    { label: "Focal Length (mm)", accessor: "focal_length_mm", sortable: true },
    { label: "ISO", accessor: "iso", sortable: true },
    { label: "Shutter Speed", accessor: "shutter_speed", sortable: true },
    { label: "Aperture", accessor: "aperture", sortable: true },
    { label: "Color Temp (K)", accessor: "color_temp_k", sortable: true },
    { label: "Image Format", accessor: "image_format", sortable: true },
    { label: "File Size (MB)", accessor: "file_size_mb", sortable: true },
    { label: "Drone Speed (m/s)", accessor: "drone_speed_mps", sortable: true },
    {
      label: "Battery Level (%)",
      accessor: "battery_level_pct",
      sortable: true,
    },
    { label: "GPS Accuracy (m)", accessor: "gps_accuracy_m", sortable: true },
    { label: "Gimbal Mode", accessor: "gimbal_mode", sortable: true },
    {
      label: "Subject Detection",
      accessor: "subject_detection",
      sortable: true,
    },
    { label: "Image Tags", accessor: "image_tags", sortable: true },
  ];

  useEffect(() => {
    fetch("/api/data")
      .then((res) =>
        res.json().then((data) => {
          console.log("Fetched data:", data);
          setTableData(data);
        })
      )
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  // console.log("Display data", tableData);

  const handleSorting = (sortField: string, sortOrder: string) => {
    // console.log(sortField, sortOrder);
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField as keyof DroneData]
            .toString()
            .localeCompare(b[sortField as keyof DroneData].toString(), "en", {
              number: true,
            }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };
  return (
    <>
      <table className="table">
        <caption>Sortable column headers</caption>
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData }} />
      </table>
    </>
  );
};

export default Table;
