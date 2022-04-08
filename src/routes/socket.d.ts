interface UserData {
  id: number;
  nick: string;
}

interface RoomData {
  id: number;
  name: string;
  users: Array<{ id: number, nick: string }>;
  hasPassword: boolean;
  roomMasterId: number;
}

interface LobbyData {
  users: Array<{ id: number, nick: string }>;
  rooms: Array<RoomData>;
}

interface ServerToClientEvents {
  'fetch lobby': (lobbyData: LobbyData) => void;
  'fetch userdata': (userData: UserData) => void;
}

interface ClientToServerEvents {
  'create room': (name: string, password: string) => void;
  'change nick': (nick: string, ack: (response) => void) => void;
  'join room': (roomId: number, password: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}
