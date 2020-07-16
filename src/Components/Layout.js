import React from "react";
import { Container } from "semantic-ui-react";

import Headers from "./Headers";

const Layout = ({ children }) => {
  return (
    <div>
      <Container>
        <Headers />
        <div style={{ marginTop: 20 }}>
          {children}
        </div>
      </Container>
    </div>
  );
};

export default Layout;
