const usePageRefresh = () => {
  const [, setState] = useState(0);
  // 只需要 setState 函数，不需要 state 值
  const pageRefresh = useCallback(() => {
    setState((state) => state + 1); // 使用回调函数来确保更新基于最新状态
  }, []);
  return pageRefresh; // 返回 pageRefresh 函数
};
export default usePageRefresh;
