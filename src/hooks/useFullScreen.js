const useFullScreen = () => {
  const [full, setFull] = useState(false);

  const requestFullScreen = () => {
    setFull(true);
    document.documentElement.requestFullscreen();
  };
  const exitFullScreen = () => {
    setFull(false);
    document.exitFullscreen();
  };

  return {
    full,
    exitFullScreen,
    requestFullScreen,
  };
};
export default useFullScreen;
