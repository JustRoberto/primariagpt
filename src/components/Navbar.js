import React from "react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  "&.active-link": activeClassNameStyle,
}));

const Navbar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="div">
              TownHall AI
            </Typography>
          </Grid>
          {!isSmallScreen && (
            <Grid item container xs spacing={0} justifyContent="center">
              <Grid item>
                <StyledNavLink
                  component={Link}
                  to="/"
                  underline="none"
                  sx={{ ...activeLinkStyle, marginRight: "16px" }}
                  activeClassName="active-link"
                  end
                >
                  General Chat
                </StyledNavLink>
                <StyledNavLink
                  component={Link}
                  to="/portfolio"
                  underline="none"
                  sx={activeLinkStyle}
                  activeClassName="active-link"
                >
                  Document Portfolio
                </StyledNavLink>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Toolbar>
      {isSmallScreen && (
        <Toolbar>
          <Box display="flex" justifyContent="center">
            <NavLink
              component={Link}
              to="/"
              underline="none"
              sx={activeLinkStyle}
              activeClassName="active-link"
              end
            >
              General Chat
            </NavLink>
            <NavLink
              component={Link}
              to="/portfolio"
              underline="none"
              sx={activeLinkStyle}
              activeClassName="active-link"
            >
              Document Portfolio
            </NavLink>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
};

const activeLinkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const activeClassNameStyle = {
  textDecoration: "underline",
};
export default Navbar;
