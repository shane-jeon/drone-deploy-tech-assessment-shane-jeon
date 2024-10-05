interface Columns {
  accessor: string;
}

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
  image_tags: Array<string> | string;
}

interface TableBodyProps {
  columns: Columns[];
  tableData: DroneData[];
}

const TableBody: React.FC<TableBodyProps> = ({
  columns,
  tableData,
}): JSX.Element => {
  // console.log("tableData", JSON.stringify(tableData));

  for (const value of Object.values(tableData)) {
    console.log(JSON.stringify(value));
    if (Array.isArray(value["image_tags"])) {
      value["image_tags"] = value["image_tags"].join(", ");
    }
  }
  console.log(JSON.stringify(tableData));
  return (
    <>
      <tbody>
        {tableData.map((data) => {
          console.log("CHECKING TYPE:", data);
          return (
            <tr key={data.image_id} className="border-2">
              {columns.map(({ accessor }: any) => {
                const tData = data[accessor as keyof DroneData] ?? "--";
                return (
                  <td key={accessor} className="text-center border-2">
                    {tData}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </>
  );
};
export default TableBody;
