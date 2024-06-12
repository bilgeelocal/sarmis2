import { tableCellClasses } from "@mui/material/TableCell";
import { Table, TableBody, TableContainer, TableRow, TableHead, TableCell, CircularProgress, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "theme/colors";
import { IOracle } from "interfaces";

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

const OracleUI: React.FC<{
  className?: string;
  data: IOracle[];
}> = ({ className = "", data }): React.ReactElement => {
  return (
    <>
      {data.length > 0 ? (
        <TableContainer component={Paper} className={`${className}`}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Affected Products and Versions</StyledTableCell>
                <StyledTableCell align="center">
                  <Typography>Patch Availability Document</Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.affected_product}>
                  <StyledTableCell>
                    <a target="_blank" href={row.affected_product_link}>
                      <Typography className="hover:cursor-pointer text-primary-blue underline">{row.affected_product}</Typography>
                    </a>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <a target="_blank" href={row.patch_document_link}>
                      <Typography className="hover:cursor-pointer text-primary-blue underline">{row.patch_document}</Typography>
                    </a>
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

export default OracleUI;
