import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const showHealthIcon = (health: number) => {
  switch (health) {
    case 0:
      return (
        <FavoriteOutlinedIcon
          sx={{
            color: "green",
          }}
        />
      );
    case 1:
      return (
        <FavoriteOutlinedIcon
          sx={{
            color: "yellow",
          }}
        />
      );
    case 2:
      return (
        <FavoriteOutlinedIcon
          sx={{
            color: "orange",
          }}
        />
      );
    case 3:
      return (
        <FavoriteOutlinedIcon
          sx={{
            color: "red",
          }}
        />
      );
  }
};

const HealthCheckEntry = ({ health }: { health: number }) => (
  <>
    <MonitorHeartIcon />
    <div>{showHealthIcon(health)}</div>
  </>
);

export default HealthCheckEntry;
