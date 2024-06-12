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
import { convertToLocal } from "utils";

interface IMicrosoft {
  Acknowledgments: string[];
  CVE: string;
  CVSSScoreSets: string[];
  DiscoveryDateSpecified: boolean;
  Notes: any;
  Ordinal: string;
  ProductStatuses: any;
  ReleaseDateSpecified: boolean;
  Remediations: any;
  RevisionHistory: any;
  Threats: any;
  Title: {
    Value: string;
  };
}

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
  data: IMicrosoft[];
}

const MicrosoftUI: React.FC<Props> = ({
  className = "",
  data,
}): React.ReactElement => {
  return (
    <>
      {data.length > 0 ? (
        <TableContainer component={Paper} className={`${className}`}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="center" width={200}>
                  CVE
                </StyledTableCell>
                <StyledTableCell align="center">Threat</StyledTableCell>
                <StyledTableCell align="center">Impact</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.CVE}>
                  <StyledTableCell>
                    <a
                      target="_blank"
                      href={`https://msrc.microsoft.com/update-guide/vulnerability/${row.CVE}`}
                    >
                      {row.Title.Value}
                    </a>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.CVE}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Threats[0].Description.Value}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Threats[1].Description.Value}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Threats[2].Description.Value}
                  </StyledTableCell>
                  <StyledTableCell
                    className="flex flex-column gap-12"
                    align="center"
                  >
                    {convertToLocal(row.RevisionHistory[0].Date)}
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

export default MicrosoftUI;
