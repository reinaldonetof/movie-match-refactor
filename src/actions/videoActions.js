export const uriVideo = (uri) => {
  return{
      type:'uriVideo',
      payload:{
        uriVideoPath:uri
      }
  };
};