import { Footer, Header } from "../Components";

function UserLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default UserLayout;
