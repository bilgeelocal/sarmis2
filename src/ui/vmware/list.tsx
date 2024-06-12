import { IVmware } from "interfaces";
import { tableCellClasses } from "@mui/material/TableCell";
import { Table, TableBody, TableContainer, TableRow, TableHead, TableCell, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "theme/colors";
import { useRouter } from "next/router";

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

const VmwareList: React.FC<{ data: IVmware[]; className?: string }> = ({ className = "", data }): React.ReactElement => {
  const router = useRouter();

  const renderSeverity = (raw: string) => {
    var el = <></>;
    if (raw === "moderate") {
      el = (
        <div className="flex items-center gap-2">
          <div className="bg-[#f5c12e] rounded h-4 w-4" />
          <div>Moderate</div>
        </div>
      );
    } else if (raw === "critical") {
      el = (
        <div className="flex items-center gap-2">
          <div className="bg-[#a30000] rounded h-4 w-4" />
          <div>Critical</div>
        </div>
      );
    } else if (raw === "important") {
      el = (
        <div className="flex items-center gap-2">
          <div className="bg-[#b85c00] rounded h-4 w-4" />
          <div>Important</div>
        </div>
      );
    } else if (raw === "low") {
      el = (
        <div className="flex items-center gap-2">
          <div className="bg-[#78be44] rounded h-4 w-4" />
          <div>Low</div>
        </div>
      );
    }
    return el;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Advisory ID</StyledTableCell>
            <StyledTableCell align="center" width={150}>
              Severity
            </StyledTableCell>
            <StyledTableCell align="center">CVE(s)</StyledTableCell>
            <StyledTableCell align="center">Updated On</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.cve}>
              <StyledTableCell width={200} align="center" onClick={() => router.push(`/vmware/${row.cve}`)}>
                <Typography className="hover:cursor-pointer text-primary-blue underline">{row.cve}</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">{renderSeverity(row.severity)}</StyledTableCell>
              <StyledTableCell>{row.synopsis}</StyledTableCell>
              <StyledTableCell align="center" width={200}>
                {row.date}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VmwareList;
