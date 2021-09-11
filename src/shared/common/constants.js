import { getMfiNameByUrl } from '@/shared/utils'

export const COLORLIST = [ // all color code are material 400
                '#EF5350', //0 red
                '#26A69A', //1 teal
                '#66BB6A', //2 green
                '#FFA726', //3 orange
                '#8D6E63', //4 brown
                '#5C6BC0', //5 indigo
                '#7E57C2', //6 purple
                '#78909C', //7 blue grey,
                '#FF7043', //8 deep orange
            ]; 
export const COLORS = {
                    red:COLORLIST[0],
                    teal:COLORLIST[1],
                    green:COLORLIST[2],
                    orange:COLORLIST[3],
                    brown:COLORLIST[4],
                    indigo:COLORLIST[5],
                    purple:COLORLIST[6],
                    blueGrey:COLORLIST[7],
                    deepOrange:COLORLIST[8]
                  };
export const URL_INFO = {
    PATH_NAME: getMfiNameByUrl(),
    HOST_NAME: location.hostname,
    HOST: location.host,
    PORT: location.port,
    PROTOCOL: location.protocol,
    ORIGIN: location.origin,
    SYMLINK_BASE_URL: "http://"+location.hostname+location.pathname
};

export default {
    COLORS,
    COLORLIST,
    URL_INFO
};