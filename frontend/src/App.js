import ProductList from './Components/ProductList';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AddProduct from "./Components/AddProduct";
import EditProduct from './Components/EditProduct';
import MembershipList from "./Components/MembershipList";
import AddMembership from './Components/AddMembership';
import EditMembership from './Components/EditMembership';
import RewardList from './Components/RewardList';
import AddReward from './Components/AddReward';
import EditReward from './Components/EditReward';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product" element={<ProductList />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/:id" element={<EditProduct />} />
        <Route path="/membership" element={<MembershipList />} />
        <Route path="/membership/add" element={<AddMembership />} />
        <Route path="/membership/:id" element={<EditMembership />} />
        <Route path="/reward" element={<RewardList />} />
        <Route path="/reward/addReward" element={<AddReward />} />
        <Route path="/reward/:id" element={<EditReward />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
