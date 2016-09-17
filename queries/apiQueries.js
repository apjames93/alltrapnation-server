var knex = require('../db/knex');

module.exports ={
  findUserByUserName: function(username){
    return knex('users').where({"username": username}).first();
  },
  getArtistData: function(){
    return knex('artist');
  },
  getAlbumData : function(){
    return knex('artist')
      .innerJoin('artist_album', 'artist_id', 'artist.id')
      .innerJoin('album', 'album_id', 'album.id')
      .innerJoin('song', 'albums_id', 'album.id');
  },

  getArtistinfo: function(id){
    return knex('artist').where({artist_id: id})
      .innerJoin('artist_album', 'artist_id', 'artist.id')
      .innerJoin('album', 'album_id', 'album.id')
      .innerJoin('song', 'albums_id', 'album.id');
  },
  deleteData: function(data){
    var songId = data.songId;
    var artistId = data.artistId;
    var albumId = data.albumId;
    return knex('artist_album')
      .del()
      .where({
       artist_id: artistId,
       album_id: albumId
    })
    .then(function(data){
      return knex('song')
        .del()
        .where({
          id: songId
        });
    })
    .then(function(data){
      return knex('artist')
        .del()
        .where({
          id : artistId
        });
    })
    .then(function(data){
      return knex('album')
        .del()
        .where({
          id : albumId
        });
      });
  },

  addData: function(data){
    var artistName= data.artistName;
    var albumName = data.albumName;
    var albumImg = data.albumImg;
    var songName = data.songName;
    return knex('artist')
    .insert({
              artistName: artistName
    }).returning('id')
    .then(function(data){
      return knex('album')
        .insert({
          albumName: albumName,
          albumImg: albumImg
        }).returning('id');
    }).then(function(data){
      return knex('artist_album')
        .insert({
          artist_id: data[0],
          album_id: data[0]
        })
        .returning('id');
    })
    .then(function(data){
      return knex('song')
        .insert({
          songName: songName,
          albums_id: data[0]
        });
    });
  },

  editData: function(data){
    var artistName= data.artistName;
    var albumName = data.albumName;
    var albumImg = data.albumImg;
    var songName = data.songName;
    var artistId = data.artistId;
    var albumId = data.albumId;
    var songId = data.songId;
    return knex('artist').update({
      artistName: artistName
    }).where({
      id: artistId
    })
    .then(function(data){
      return knex('album')
      .update({
        albumName: albumName,
        albumImg: albumImg
      }).where({
        id: albumId
      });
    })
    .then(function(data){
      return knex('song')
      .update({
        songName: songName
      })
      .where({id: songId});
    });
  }
};
