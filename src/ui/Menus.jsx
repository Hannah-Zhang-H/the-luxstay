// I was considering not using this file, otherwise too compicated
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
// I was considering not using this file, otherwise too compicated
const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  // I was considering not using this file, otherwise too compicated
  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;
// 没必要，就是加了三个点，弹出三个框。不好看， 这个文件可以删了。// 没必要，就是加了三个点，弹出三个框。不好看， 这个文件可以删了。
const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;
  // I was considering not using this file, otherwise too compicated
  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();
// I was considering not using this file, otherwise too compicated
// ========================================= Menus ========================================
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null); // Used in toggled button to decide the position of icons

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// ========================================= Toggle ========================================
function Toggle({ id }) {
  const { openId, close, open, position, setPosition } =
    useContext(MenusContext);

  function handleClick(e) {
    // to get the bounding rectangle of the button element closest to the target element (e.target) clicked by the user
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <StyledButton onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledButton>
  );
}

// ========================================= List ========================================
function List({ id, children }) {
  const { openId, position } = useContext(MenusContext);
  if (openId !== id) return null;
  return createPortal(
    <StyledList position={position}>{children}</StyledList>,
    document.body
  );
}

// ========================================= Button ========================================
function Button({ children }) {
  return (
    <li>
      <StyledButton>{children}</StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
