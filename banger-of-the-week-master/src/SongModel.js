import {v4 as uuidv4} from "uuid"
class SongModel{
    constructor(song){
        this.spotifyID = song.spotifyID
        this.title=song.title
        this.artist = song.artist
        this.addedBy = song.addedBy
        this.votes = song.votes;
        this.compID = song.id
        this.voters = [],
        this.previewURL = song.previewURL,
        this.imgURL = song.imgURL,
        this.spotifyURL = song.spotifyURL
    }

    getModelAsJSON(){
      return{
        spotifyID: this.spotifyID,
        title: this.title,
        artist: this.artist,
        addedBy: this.addedBy,
        votes: this.votes,
        compID: this.compID,
        previewURL: this.previewURL,
        imgURL: this.imgURL,
        spotifyURL: this.spotifyURL
      }
    }

    createUniqueID(){
        return uuidv4()
    }

    vote(voter){
        this.voters.push(voter);
        this.votes +=1;
    }
}

export default SongModel;
