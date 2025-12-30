export const useGetDevicesInTrack = () => {
  const getListDevicesInTrack = async () => {
    const dataDeviceInTrack = await fetch('http://172.21.72.238:3000');
    console.log(dataDeviceInTrack);
  };
};
