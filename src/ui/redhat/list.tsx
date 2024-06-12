import { convertToLocal } from "utils";
import { tableCellClasses } from "@mui/material/TableCell";
import { Table, TableBody, TableContainer, TableRow, TableHead, TableCell, CircularProgress, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "theme/colors";
import { BsShieldExclamation } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import { IoBugOutline } from "react-icons/io5";
import IRedHat from "interfaces/IRedHat";
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

interface Props {
  className?: string;
  data: IRedHat[];
}

const RedHatUI: React.FC<Props> = ({ className = "", data }): React.ReactElement => {
  const router = useRouter();
  const renderSeverity = (raw: string) => {
    var el = <></>;
    if (raw.includes(":")) {
      var parts = raw.split(": ");
      if (parts[1] === "Important") {
        el = <div className="bg-[#b85c00] p-1 rounded text-white">Important</div>;
      } else if (parts[1] === "Moderate") {
        el = <div className="bg-[#f5c12e] p-1 rounded">Moderate</div>;
      } else if (parts[1] === "Low") {
        el = <div className="bg-[#316dc1] p-1 rounded text-white">Low</div>;
      } else if (parts[1] === "Critical") {
        el = <div className="bg-[#a30000] p-1 rounded text-white">Critical</div>;
      }
    }
    const containerBuild = (icon: React.ReactElement, el: React.ReactElement, raw: string) => {
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1">
            {icon} {raw.split(": ")[0]}
          </div>
          <div className="flex">{el}</div>
        </div>
      );
    };
    if (raw.includes("Product Enhancement Advisory")) {
      return <>{containerBuild(<BiCog size={20} />, el, raw)}</>;
    } else if (raw.includes("Bug Fix")) {
      return <>{containerBuild(<IoBugOutline size={20} />, el, raw)}</>;
    } else if (raw.includes("Advisory")) {
      return <>{containerBuild(<BsShieldExclamation size={20} />, el, raw)}</>;
    }
  };

  return (
    <>
      {data.length > 0 ? (
        <TableContainer component={Paper} className={`${className}`}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell width={150} align="center">
                  Advisory
                </StyledTableCell>
                <StyledTableCell width={250} align="center">
                  Synopsis
                </StyledTableCell>
                <StyledTableCell align="center">Type/Severity</StyledTableCell>
                <StyledTableCell align="center">Products</StyledTableCell>
                <StyledTableCell width={200} align="center">
                  Publish Date
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.cve}>
                  <StyledTableCell onClick={() => router.push(`/redhat/${row.cve}`)}>
                    <Typography className="hover:cursor-pointer text-primary-blue underline">{row.cve}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>{row.synopsis}</StyledTableCell>
                  <StyledTableCell align="center">{renderSeverity(row.severity)}</StyledTableCell>
                  <StyledTableCell>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: row.affected_products,
                      }}
                    ></div>
                  </StyledTableCell>
                  <StyledTableCell align="right">{convertToLocal(row.date)}</StyledTableCell>
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

export default RedHatUI;
