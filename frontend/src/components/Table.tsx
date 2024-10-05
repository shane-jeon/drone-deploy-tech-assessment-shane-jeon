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

// type DetailsType = { [key: number]: DroneData };

const Table = () => {
  const [tableData, setTableData] = useState<Array<any>>([]);

  const columns: { label: string; accessor: string }[] = [
    { label: "Image ID", accessor: "image_id" },
    { label: "Timestamp", accessor: "timestamp" },
    { label: "Latitude", accessor: "latitude" },
    { label: "Longitude", accessor: "longitude" },
    { label: "Altitude (m)", accessor: "altitude_m" },
    { label: "Heading (deg)", accessor: "heading_deg" },
    { label: "File Name", accessor: "file_name" },
    { label: "Camera Tilt (deg)", accessor: "camera_tilt_deg" },
    { label: "Focal Length (mm)", accessor: "focal_length_mm" },
    { label: "ISO", accessor: "iso" },
    { label: "Shutter Speed", accessor: "shutter_speed" },
    { label: "Aperture", accessor: "aperture" },
    { label: "Color Temp (K)", accessor: "color_temp_k" },
    { label: "Image Format", accessor: "image_format" },
    { label: "File Size (MB)", accessor: "file_size_mb" },
    { label: "Drone Speed (m/s)", accessor: "drone_speed_mps" },
    { label: "Battery Level (%)", accessor: "battery_level_pct" },
    { label: "GPS Accuracy (m)", accessor: "gps_accuracy_m" },
    { label: "Gimbal Mode", accessor: "gimbal_mode" },
    { label: "Subject Detection", accessor: "subject_detection" },
    { label: "Image Tags", accessor: "image_tags" },
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

  // const dataArray: any = [];
  // const dataArray = Object.entries(tableData).map(([key, detail]: [string, DroneData]) => {
  //   console.log("key", key, "detail", detail);
  // });
  // Object.entries(tableData).map((obj) => {
  //   dataArray.push(tableData);
  // });
  console.log("Display data", tableData);
  return (
    <>
      <table className="table">
        <caption>Sortable column headers</caption>
        <TableHead columns={columns} />
        <TableBody columns={columns} tableData={tableData} />
      </table>
    </>
  );
};

export default Table;
// export default function Table() {
//   const [details, setDetails] = useState<DetailsType>({});

//   useEffect(() => {
//     fetch("/api/data")
//       .then((res) =>
//         res.json().then((data) => {
//           console.log("Fetched data:", data);
//           setDetails(data);
//         })
//       )
//       .catch((error) => console.log("Error fetching data:", error));
//   }, []);

//   // Generate table rows dynamically
//   const displayData = Object.entries(details).map(
//     ([key, detail]: [string, DroneData]) => (
//       <tr key={key} className="border-4">
// <td className="border p-2">{detail.image_id}</td>
// <td className="border p-2">{detail.timestamp}</td>
// <td className="border p-2">{detail.latitude}</td>
// <td className="border p-2">{detail.longitude}</td>
// <td className="border p-2">{detail.altitude_m}</td>
// <td className="border p-2">{detail.heading_deg}</td>
// <td className="border p-2">{detail.file_name}</td>
// <td className="border p-2">{detail.camera_tilt_deg}</td>
// <td className="border p-2">{detail.focal_length_mm}</td>
// <td className="border p-2">{detail.iso}</td>
// <td className="border p-2">{detail.shutter_speed}</td>
// <td className="border p-2">{detail.aperture}</td>
// <td className="border p-2">{detail.color_temp_k}</td>
// <td className="border p-2">{detail.image_format}</td>
// <td className="border p-2">{detail.file_size_mb}</td>
// <td className="border p-2">{detail.drone_speed_mps}</td>
// <td className="border p-2">{detail.battery_level_pct}</td>
// <td className="border p-2">{detail.gps_accuracy_m}</td>
// <td className="border p-2">{detail.gimbal_mode}</td>
// <td className="border p-2">{detail.subject_detection}</td>
// <td className="border p-2">{detail.image_tags.join(", ")}</td>
//       </tr>
//     )
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="mb-4 text-lg font-bold">Drone Data Table</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full table-fixed border-collapse border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-4">Image ID</th>
//               <th className="border p-4">Timestamp</th>
//               <th className="border p-4">Latitude</th>
//               <th className="border p-4">Longitude</th>
//               <th className="border p-4">Altitude (m)</th>
//               <th className="border p-4">Heading (deg)</th>
//               <th className="border p-4">File Name</th>
//               <th className="border p-4">Camera Tilt (deg)</th>
//               <th className="border p-4">Focal Length (mm)</th>
//               <th className="border p-4">ISO</th>
//               <th className="border p-4">Shutter Speed</th>
//               <th className="border p-4">Aperture</th>
//               <th className="border p-4">Color Temp (K)</th>
//               <th className="border p-4">Image Format</th>
//               <th className="border p-4">File Size (MB)</th>
//               <th className="border p-4">Drone Speed (m/s)</th>
//               <th className="border p-4">Battery Level (%)</th>
//               <th className="border p-4">GPS Accuracy (m)</th>
//               <th className="border p-4">Gimbal Mode</th>
//               <th className="border p-4">Subject Detection</th>
//               <th className="border p-4">Image Tags</th>
//             </tr>
//           </thead>
//           <tbody>{displayData}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// const headers: string[] = [
//   "image_id",
//   "timestamp",
//   "latitude",
//   "longitude",
//   "altitude_m",
//   "heading_deg",
//   "file_name",
//   "camera_tilt_deg",
//   "focal_length_mm",
//   "iso",
//   "shutter_speed",
//   "aperture",
//   "color_temp_k",
//   "image_format",
//   "file_size_mb",
//   "drone_speed_mps",
//   "battery_level_pct",
//   "gps_accuracy_m",
//   "gimbal_mode",
//   "subject_detection",
//   "image_tags",
// ];

// export default function Table() {
//   const [details, setDetails] = useState<DroneData[]>([]);
//   useEffect(() => {
//     fetch("/api/data").then((res) =>
//       res
//         .json()
//         .then((data: any) => {
//           console.log("Fetched data:", data, typeof data);
//           setDetails(data.drone_data || []);
//         })
//         .catch((error) => console.log("Error fetching data:", error))
//     );
//   }, []);

//   const displayData = details.map((detail: DroneData): JSX.Element => {
//     console.log("Detail", detail);
//     return (
//       <tr className="flex flex-col">
//         <td className="border-2">{detail.image_id}</td>
//         <td className="border-2">{detail.timestamp}</td>
//         <td className="border-2">{detail.latitude}</td>
//         <td className="border-2">{detail.longitude}</td>
//         <td className="border-2">{detail.altitude_m}</td>
//         <td className="border-2">{detail.heading_deg}</td>
//         <td className="border-2">{detail.file_name}</td>
//         <td className="border-2">{detail.camera_tilt_deg}</td>
//         <td className="border-2">{detail.focal_length_mm}</td>
//         <td className="border-2">{detail.iso}</td>
//         <td className="border-2">{detail.shutter_speed}</td>
//         <td className="border-2">{detail.aperture}</td>
//         <td className="border-2">{detail.color_temp_k}</td>
//         <td className="border-2">{detail.image_format}</td>
//         <td className="border-2">{detail.file_size_mb}</td>
//         <td className="border-2">{detail.drone_speed_mps}</td>
//         <td className="border-2">{detail.battery_level_pct}</td>
//         <td className="border-2">{detail.gps_accuracy_m}</td>
//         <td className="border-2">{detail.gimbal_mode}</td>
//         <td className="border-2">{detail.subject_detection}</td>
//         <td className="border-2">{detail.image_tags}</td>
//       </tr>
//     );
//   });

//   return (
//     <div>
//       <div className="container mx-auto p-4">
//         <div className="border-green">
//           <table className="flex">
//             <thead>
//               <tr className="flex flex-col">
//                 <th className="border-2">Image ID</th>
//                 <th className="border-2">Timestamp</th>
//                 <th className="border-2">Latitude</th>
//                 <th className="border-2">Longitude</th>
//                 <th className="border-2">Altitude (m)</th>
//                 <th className="border-2">Heading (deg)</th>
//                 <th className="border-2">File Name</th>
//                 <th className="border-2">Camera Tilt (deg)</th>
//                 <th className="border-2">Focal Length (mm)</th>
//                 <th className="border-2">ISO</th>
//                 <th className="border-2">Shutter Speed</th>
//                 <th className="border-2">Aperture</th>
//                 <th className="border-2">Color Temp (K)</th>
//                 <th className="border-2">Image Format</th>
//                 <th className="border-2">File Size (MB)</th>
//                 <th className="border-2">Drone Speed (m/s)</th>
//                 <th className="border-2">Battery Level (%)</th>
//                 <th className="border-2">GPS Accuracy (m)</th>
//                 <th className="border-2">Gimbal Mode</th>
//                 <th className="border-2">Subject Detection</th>
//                 <th className="border-2">Image Tags</th>
//               </tr>
//             </thead>
//             <tbody className="flex">{displayData}</tbody>
//           </table>
//         </div>
//       </div>
//       <div>{/* <DataTable columns={columns} data={rows} /> */}</div>
//     </div>
//   );
// }
