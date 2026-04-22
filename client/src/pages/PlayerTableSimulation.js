import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../components/layout/Container';
import Button from '../components/buttons/Button';
import { PositionedUISlot } from '../components/game/PositionedUISlot';
import PokerTable from '../components/game/PokerTable';
import { PokerTableWrapper } from '../components/game/PokerTableWrapper';
import { Seat } from '../components/game/Seat/Seat';
import BrandingImage from '../components/game/BrandingImage';
import background from '../assets/img/background.png';

// Mock WebSocket simulation
class MockWebSocket {
  constructor() {
    this.listeners = {};
    this.interval = null;
  }

  on(event, callback) {
    this.listeners[event] = callback;
  }

  off(event, callback) {
    if (this.listeners[event] === callback) {
      delete this.listeners[event];
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event](data);
    }
  }

  startSimulation() {
    this.interval = setInterval(() => {
      const randomPlayer = Math.floor(Math.random() * 6);
      const randomStatus = Math.random() > 0.5 ? 'active' : 'waiting';

      this.emit('player_status_update', {
        seatNumber: randomPlayer,
        status: randomStatus,
        timestamp: Date.now()
      });
    }, 3000);
  }

  stopSimulation() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

const mockSocket = new MockWebSocket();

const Controls = styled.div`
  position: absolute;
  top: 2vh;
  left: 15.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  z-index: 50;
  transform: scale(0.65);
`;

const ControlButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  margin: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NameTag = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
`;

const StatusPill = styled.div`
  background: ${({ status }) => status === 'active' ? '#48ff52' : '#ff3332'};
  color: ${({ status }) => status === 'active' ? '#000' : '#fff'};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 5px;
`;

const ChipsDisplay = styled.div`
  color: white;
  font-weight: bold;
  margin-top: 5px;
  font-size: 0.85rem;
`;

const PlayerTableSimulation = () => {
  const initialPlayers = [
    { id: 1, name: 'Alice', status: 'waiting', chips: 1000 },
    { id: 2, name: 'Bob', status: 'waiting', chips: 1200 },
    { id: 3, name: 'Charlie', status: 'waiting', chips: 800 },
    { id: 4, name: 'Diana', status: 'waiting', chips: 1500 },
    { id: 5, name: 'Eve', status: 'waiting', chips: 950 },
    { id: 6, name: 'Frank', status: 'waiting', chips: 1100 }
  ];

  const [players, setPlayers] = useState(initialPlayers);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  useEffect(() => {
    mockSocket.on('player_status_update', handlePlayerStatusUpdate);

    return () => {
      mockSocket.stopSimulation();
      mockSocket.off('player_status_update', handlePlayerStatusUpdate);
    };
  }, []);

  const handlePlayerStatusUpdate = (data) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === data.seatNumber + 1
          ? { ...player, status: data.status }
          : player
      )
    );
  };

  const startSimulation = () => {
    setIsSimulationRunning(true);
    mockSocket.startSimulation();
  };

  const stopSimulation = () => {
    setIsSimulationRunning(false);
    mockSocket.stopSimulation();
  };

  const toggleSimulation = () => {
    if (isSimulationRunning) {
      stopSimulation();
    } else {
      startSimulation();
    }
  };

  return (
    <Container
      fullHeight
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundColor: 'black',
      }}
      className="play-area"
    >
      <Controls>
        <ControlButton onClick={toggleSimulation}>
          {isSimulationRunning ? 'Stop Simulation' : 'Start Simulation'}
        </ControlButton>
      </Controls>

      <PokerTableWrapper>
        <PokerTable />

        <PositionedUISlot
          top="-5%"
          left="0"
          scale="0.55"
          origin="top left"
        >
          <NameTag>
            {players[0]?.name}
            <StatusPill status={players[0]?.status}>
              {players[0]?.status.toUpperCase()}
            </StatusPill>
            <ChipsDisplay>Chips: {players[0]?.chips.toLocaleString()}</ChipsDisplay>
          </NameTag>
        </PositionedUISlot>

        <PositionedUISlot
          top="-5%"
          right="2%"
          scale="0.55"
          origin="top right"
        >
          <NameTag>
            {players[1]?.name}
            <StatusPill status={players[1]?.status}>
              {players[1]?.status.toUpperCase()}
            </StatusPill>
            <ChipsDisplay>Chips: {players[1]?.chips.toLocaleString()}</ChipsDisplay>
          </NameTag>
        </PositionedUISlot>

        <PositionedUISlot
          bottom="15%"
          right="2%"
          scale="0.55"
          origin="bottom right"
        >
          <NameTag>
            {players[2]?.name}
            <StatusPill status={players[2]?.status}>
              {players[2]?.status.toUpperCase()}
            </StatusPill>
            <ChipsDisplay>Chips: {players[2]?.chips.toLocaleString()}</ChipsDisplay>
          </NameTag>
        </PositionedUISlot>

        <PositionedUISlot bottom="8%" scale="0.55" origin="bottom center">
          <NameTag>
            {players[3]?.name}
            <StatusPill status={players[3]?.status}>
              {players[3]?.status.toUpperCase()}
            </StatusPill>
            <ChipsDisplay>Chips: {players[3]?.chips.toLocaleString()}</ChipsDisplay>
          </NameTag>
        </PositionedUISlot>

        <PositionedUISlot
          bottom="15%"
          left="0"
          scale="0.55"
          origin="bottom left"
        >
          <NameTag>
            {players[4]?.name}
            <StatusPill status={players[4]?.status}>
              {players[4]?.status.toUpperCase()}
            </StatusPill>
            <ChipsDisplay>Chips: {players[4]?.chips.toLocaleString()}</ChipsDisplay>
          </NameTag>
        </PositionedUISlot>

        <PositionedUISlot
          top="-25%"
          scale="0.55"
          origin="top center"
          style={{ zIndex: '1' }}
        >
          <BrandingImage />
        </PositionedUISlot>

        <PositionedUISlot
          bottom="15%"
          right="2%"
          scale="0.55"
          origin="bottom right"
        >
          <NameTag>
            {players[5]?.name}
            <StatusPill status={players[5]?.status}>
              {players[5]?.status.toUpperCase()}
            </StatusPill>
            <ChipsDisplay>Chips: {players[5]?.chips.toLocaleString()}</ChipsDisplay>
          </NameTag>
        </PositionedUISlot>
      </PokerTableWrapper>
    </Container>
  );
};

export default PlayerTableSimulation;