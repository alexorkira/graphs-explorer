import React, { useState } from "react";
import ContextStore from "../../store";
import "./Header.scss";

const Header: React.FC = () => {
    const [showMenu, setShowMenu ] = useState<boolean>(false);
    const logout = ContextStore.useStoreActions((actions) => actions.logout);
    const sessionToken = ContextStore.useStoreState((store) => store.sessionToken);
    
    return (
        <header className="header chi-header -portal">
            <nav className="chi-header__content">
                <div className="chi-header__end">
                    <div className="-d--none -d-lg--flex">
                        <div className="chi-dropdown -d--none -d-lg--flex">
                            <button 
                                className={`chi-button -flat chi-dropdown__trigger -px--1 -animate ${showMenu ? '-active' : ''}`}
                                id="button-user-menu" 
                                data-position="bottom-end"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                Menu
                            </button>
                            <div className={`chi-dropdown__menu -w--sm ${showMenu ? '-active' : ''}`} >
                                <div className="chi-dropdown__menu-item">
                                    <i className="chi-icon icon-user"></i>
                                    <span>Profile</span>
                                </div>
                                <div className="chi-dropdown__menu-item" onClick={() => logout(sessionToken!)}>
                                    <i className="chi-icon icon-logout"></i>
                                    <span>Logout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
