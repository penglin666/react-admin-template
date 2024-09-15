import { useSelector, useDispatch } from "react-redux";
import { incrementByAmount } from "@/store/modules/user";
const Home = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="page-container">
      <div>{count}</div>
      <button onClick={() => dispatch(incrementByAmount(99))}>设置为99</button>
    </div>
  );
};
export default Home;
