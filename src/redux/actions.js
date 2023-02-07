import { REQUEST_DONE,REQUEST_START } from './actionTypes';
import { regions } from '../regions';
let Array = []
const ping = async (url,data, timeout = 6000) => {
    await regions.forEach(r=>{
        let data = {
          name:r.displayName,
          geography: r.geography,
          regionName: r.regionName
        }
        return new Promise((resolve, reject) => {
            
            let start = new Date().getTime();
            try {
            fetch(`https://dynamodb.${r.regionName}.amazonaws.com/ping?x=35gg91n9v9i00`)
                .then(() => {
                const currentTime = new Date().getTime()
                const newdata = {
                    ...data,
                    pingtime:currentTime-start
                }
                
                resolve(newdata)
                })
                .catch(() => {
                const newdata = {
                    ...data,
                    pingtime:0
                }
                resolve(newdata)
                });
            setTimeout(() => {
                resolve(0);
            }, timeout);
            } catch (e) {
            reject(e);
            }
        });})
};
export const getping = (id) => async (dispatch) => {
    dispatch({
      type: REQUEST_START,
    });
    
    try {
            ping()
      dispatch({
        type: REQUEST_DONE,
        payload: Array,
      });
    } catch (err) {
      console.log(err)
    }
  };