import { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "theme/colors";
import { ICisco } from "interfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.text.whiteGrey,
    color: colors.primary.dark,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Props {
  className?: string;
  data: ICisco[];
}

const CiscoUI: React.FC<Props> = ({
  className = "",
  data,
}): React.ReactElement => {
  const renderSeverity = (raw: string) => {
    var el = <></>;
    if (raw === "Medium") {
      el = (
        <div className="flex items-center gap-2">
          <div className=" bg-[#f5c12e] rounded h-4 w-4" />
          <div>{raw}</div>
        </div>
      );
    } else if (raw === "High") {
      el = (
        <div className="flex items-center gap-2">
          <div className=" bg-[#a30000] rounded h-4 w-4" />
          <div>Critical</div>
        </div>
      );
    } else if (raw === "Critical") {
      el = (
        <div className="flex items-center gap-2">
          <div className="bg-[#a30000] rounded h-4 w-4" />
          <div>Critical</div>
        </div>
      );
    }
    return el;
  };
  return (
    <>
      {data.length > 0 ? (
        <TableContainer component={Paper} className={`${className}`}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell width={500} align="center">
                  Advisory
                </StyledTableCell>
                <StyledTableCell width={50}>Impact</StyledTableCell>
                <StyledTableCell width={100} align="center">
                  CVE
                </StyledTableCell>
                <StyledTableCell width={200} align="center">
                  Last updated
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    <a target="_blank" href={row.link}>
                      <Typography className="hover:cursor-pointer text-primary-blue underline">
                        {row.title}
                      </Typography>
                    </a>
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderSeverity(row.impact)}
                  </StyledTableCell>
                  <StyledTableCell
                    className="flex flex-column gap-12"
                    align="center"
                  >
                    {row.clean_cves.map((it) => (
                      <Typography variant="body1" key={it}>
                        {it}
                      </Typography>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.last_updated}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="flex items-center justify-center my-60">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default CiscoUI;
