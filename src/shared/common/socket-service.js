import io from 'socket.io-client';
import StorageService from "@/shared/common/storage.service";

export const socket = io.connect("localhost:9001", {
    query: {
        token: StorageService.getToken()
    }
  });

 //export default socket;