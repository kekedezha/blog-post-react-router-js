import { useStoreState } from "easy-peasy";

const Footer = () => {
  const numPosts = useStoreState((state) => state.postCount);

  return (
    <footer className="Footer">
      <p>{numPosts} post(s)</p>
    </footer>
  );
};

export default Footer;
