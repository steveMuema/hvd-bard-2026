import React from 'react';
import styled from 'styled-components';
import { PokerTableWrapper } from './game/PokerTableWrapper';
import PokerTable from './game/PokerTable';

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
`;

const TableContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
`;

const PlayerTable = ({ children }) => {
  return (
    <StyledTable>
      <TableContainer>
        <PokerTableWrapper>
          <PokerTable />
        </PokerTableWrapper>
        {children}
      </TableContainer>
    </StyledTable>
  );
};

export default PlayerTable;