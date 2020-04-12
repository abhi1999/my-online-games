import {axiosRoot} from "./../config/axios"
import {IGame, IGameParticipant, IVerifyPassowrd,IGameDetails, IClaimAck} from './../common/interfaces';

/*
import {IGame, IGameParticipant, IVerifyPassowrd, WinType, IGameWinItem,IGameDetails, IClaimAck} from './../common/interfaces';

// IGame, IError, IGameParticipant, IVerifyPassowrd, WinType, IGameWinItem,IGameDetails
import {getBingoNumber} from "./bingo-util"



const gameListData:IGame[]=[
    {id:"1", name:'Game1'},
    {id:"2", name:'Family Bingo'},
    {id:"3", name:'Family Bingo 2'},
    {id:"4", name:'Family Bingo 3'}
]
const gameParticipants:IGameParticipant[]=[]
const gameDetails:IGameDetails[]=[];
const participants:string[]=["abhishek", 'aadi', 'Rashmi'];


gameListData.forEach(game=>{
    participants.forEach((element:string) => {
        gameParticipants.push({gameId:game.id, id:element, name:element})
    });

    const winItems:IGameWinItem[]=[
        {name:'First Row', type:WinType.TopLine, isAvailabe:true},
        {name:'Bottom Row', type:WinType.BottomLine, isAvailabe:false, winnerName:"Abhishek"},
        {name:'Fullhouse ', type:WinType.FullHouse1, isAvailabe:true}
    ]
    const calledNumbers = [1,2,3,4]
    gameDetails.push({
        gameId:game.id,
        winItems,
        calledNumbers,
        updateTime:new Date(),
        refreshedTime:new Date()
    })
})


*/
const serviceURLs={
  /*getGameList:"/admin/game",
  getGameParticipants:"/2/getGameParticipants",
  verifyPassword:"/2/verifyPassword",
  getGameDetails:"/2/getGameDetails",
  */getGameParticipants:"/getGameParticipants",
  getGameList:"/getGameList",
  verifyPassword:"/verifyPassword",
  getGameDetails:"/getGameDetails",
  claimBingo:"/claimBingo",
  callNumber:'/callNumber',
  cancelNumberCall:'/cancelNumberCall',
  admin:'/admin/game',
}

export const getGameList = (): Promise<IGame[]> => {
    return axiosRoot.get(serviceURLs.getGameList)
};
export const getGameParticipants = (gameId:string): Promise<IGameParticipant[]> => {
    return axiosRoot.get(serviceURLs.getGameParticipants + "/"+gameId)
};
export const verifyPassword = (gameId:string, participantId:string, password:string): Promise<IVerifyPassowrd> => {
    return axiosRoot.post(serviceURLs.verifyPassword + "/"+gameId+"/"+participantId, {"password":password})
};
export const getGameDetails = (gameId:string, participantId:string):Promise<IGameDetails>=>{
    return axiosRoot.get(serviceURLs.getGameDetails + "/"+gameId+"/"+participantId)
}
export const claimBingo = (gameId:string, participantId:string): Promise<IClaimAck> => {
    const promise = new Promise<IClaimAck>(resolve => {
      setTimeout(() => {
        resolve({message:"Bingo reported"})
      },1000);
    });
    return promise;
};

export const registerCallNumber = (gameId:string, participantId:string, number:number):Promise<void>=>{
    return axiosRoot.get(serviceURLs.callNumber + "/"+gameId+"/"+participantId + "/"+number)
}
export const cancelCalledNumber = (gameId:string, participantId:string, number:number):Promise<void>=>{
    return axiosRoot.get(serviceURLs.cancelNumberCall + "/"+gameId+"/"+participantId+"/"+number)
}

export const createGame= (name:string):Promise<any>=>{
    return axiosRoot.post(serviceURLs.admin, {name})
  }
  /*
  export const getJobSiteById= (id:string):Promise<any>=>{
    return axiosRoot.get(serviceURLs.getById+id)
  }
  */
  export const updateGameById= (gameId:string, game:IGame):Promise<any>=>{
    return axiosRoot.put(serviceURLs.admin+"/"+gameId, game)
  }
  export const deleteGameById= (gameId:string):Promise<any>=>{
    return axiosRoot.delete(serviceURLs.admin+"/"+gameId)
  }
/*


export const getGameList = (): Promise<IGame[]> => {
  const promise = new Promise<IGame[]>(resolve => {
    setTimeout(() => {
      resolve(gameListData);
    }, 1000);
  });
  return promise;
};
export const getGameParticipants = (gameId:string): Promise<IGameParticipant[]> => {
    const promise = new Promise<IGameParticipant[]>(resolve => {
      setTimeout(() => {
        resolve(gameParticipants.filter(gp=> gp.gameId===gameId));
      }, 1000);
    });
    return promise;
};
export const verifyPassword = (gameid:string, participantId:string, password:string): Promise<IVerifyPassowrd> => {
    const promise = new Promise<IVerifyPassowrd>(resolve => {
      setTimeout(() => {
        
        resolve({isValid:participantId === password, 
                    message:participantId === password?'Succesful':"Wrong Password", 
                    bingoCardNumbers:getBingoNumber(), participantId})
      }, 1000);
    });
    return promise;
};
export const getGameDetails = (gameId:string, participantId:string):Promise<IGameDetails>=>{
    const promise = new Promise<IGameDetails>(resolve => {
        setTimeout(() => {
          resolve(gameDetails.find(gd=> gd.gameId === gameId));
        }, 1000);
      });
      return promise;
    
}
export const claimBingo = (gameId:string, participantId:string): Promise<IClaimAck> => {
    const promise = new Promise<IClaimAck>(resolve => {
      setTimeout(() => {
        resolve({message:"Bingo reported"})
      },1000);
    });
    return promise;
};

*/