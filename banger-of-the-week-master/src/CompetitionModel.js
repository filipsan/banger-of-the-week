import SongModel from "./SongModel.js";
class CompetitionModel {
    constructor(competition={genre:'Rock', enddate:'2022-04-06', name:'Melkers finest', guests: ["Fisan"]}){
        this.genre = competition.genre
        this.enddate = competition.enddate
        this.name = competition.name
        this.songs = []//consists of song objects
        this.guests = competition.guests||{}
        this.id = competition.id
        this.ownerUID = competition.uid
        this.owner = competition.owner
        this.observers = []
        this.createdOn = competition.createdOn
        this.description = competition.description,
        this.password = competition.password


    }
    getSongsAsJSON(){
      const songList = []
      this.songs.forEach((function songAsJSON(song){
        songList.push(song.getModelAsJSON())
      }))
      return songList
    }
    getModelAsJSON(){
      const songList = this.getSongsAsJSON()
      return {
        genre: this.genre,
        enddate: this.enddate,
        name: this.name,
        songs: songList,
        guests: this.guests,
        id: this.id,
        owner: this.owner,
        createdOn: this.createdOn,
        description: this.description,
        ownerUID: this.ownerUID,
        password: this.password
      }
    }
    addSong(title,artist,addedBy, spotifyID, previewURL, imgURL, spotifyURL, state){
        var songInCompetition = false;
        this.songs.forEach(function(song){
          if(song.spotifyID == spotifyID){
            state.show=true;
            state.msg="A song can only be added once!"
            state.variant='warning'
            songInCompetition = true;
          }
        })
        if (!songInCompetition){
          const songConstructorInput = {
            title: title,
            artist: artist,
            addedBy: addedBy,
            spotifyID: spotifyID,
            id: this.id,
            imgURL: imgURL,
            previewURL: previewURL,
            votes:0,
            spotifyURL: spotifyURL
          }
          var songObj = new SongModel(songConstructorInput)
          this.songs.push(songObj);
          const SongModelAsJSON = songObj.getModelAsJSON()
          this.notifyObservers({addedSong: SongModelAsJSON})
        }
    }
    removeSong(toRemoveID){
      function filterByIdCB(song){
        if(song.spotifyID == toRemoveID){
          return false
        } else{
          return true
        }
      }

      this.songs = this.songs.filter(filterByIdCB)
      const firebasePayload = {
        competitionID: this.id,
        songID: toRemoveID
      }

      this.notifyObservers({removedSong: firebasePayload})
    }


    getName(){
      return this.name
    }
    addObserver(callback){
        this.observers=this.observers.concat(callback)
    }
    removeObserver(callback){
      function callbackInObserversCB(cb){
            if(callback === cb){
              return false
            } else{
            return true
          }
      }
      this.observers=this.observers.filter(callbackInObserversCB)
    }
    notifyObservers(payload){
      this.observers.forEach(function invokeObserverCB(obs){
        try{
          obs(payload)
        }
        catch(err){console.error(err)}
      });
    }

    addGuest(guest){
      const guestUID = guest.uid
      const guestDisplayName = guest.displayName
      if(!this.guests[guestUID]){
          this.guests[guestUID] = guestDisplayName
          const firebasePayload = {
            addedGuestUID: guestUID,
            addedGuestDisplayName: guestDisplayName,
            compID: this.id
          }
          this.notifyObservers({joinedCompetition: firebasePayload})
        }
    }
    removeGuest(guest){
      const component = this;
      const guestUID = guest.uid
      const guestDisplayName = guest.displayName
      if(this.guests[guestUID]){
        var index = 0;
        this.songs.forEach(function removeUserSongsCB(song){
          if(song.addedBy==guest.displayName){
            component.removeSong(song.spotifyID)
          }
          index = index +1;

        })
        delete this.guests[guestUID]
        const firebasePayload = {
          removedGuestUID: guestUID,
          removedGuestDisplayName: guestDisplayName,
          compID: this.id
        }
        this.notifyObservers({leftCompetition: firebasePayload})
      }
    }


    vote(songID, voter){
      var votes = 0;
      this.songs.forEach(function addVoteCB(song){
        if(song.spotifyID==songID){
          song.vote(voter)
          votes = song.votes;
        }
      })
      const firebasePayload = {
        compID: this.id,
        songID: songID,
        voter: voter,
        votes:votes
      }
      this.notifyObservers({songVote: firebasePayload})
    }
}

export default CompetitionModel;
