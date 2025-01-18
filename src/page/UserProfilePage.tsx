import { FiEdit, FiSave, FiUpload, FiXCircle } from "react-icons/fi";
import { Button, CircularProgress } from "@mui/material";

import AvatarComponent from "@/components/AvatarComponent";
import HeadComponent from "@/components/HeadComponent";
import useUserProfile from "@/hooks/useUserProfile";
import BreadCrumbs from "@/components/BreadCrumbs";
import InputBasic from "@/components/InputBasic";

import "@/styles/UserProfilePage.css";

const UserProfilePage = () => {
  const { user, links, loading, handleOnSubmit } = useUserProfile();
  return (
    <>
      <HeadComponent title={`Perfile de ${user.displayName}`} />
      <BreadCrumbs links={links} />

      <header className="main_header">
        <h1 className="header_title">Usuario {user.displayName}</h1>
        <div className="header_btnGroup">
          <Button variant="contained" startIcon={<FiEdit />}>
            Modificar datos
          </Button>
        </div>
      </header>

      <div className="user-profile">
        <form className="form-profile" onSubmit={handleOnSubmit}>
          <div className="form-first-section">
            <div className="form-avatar-component">
              {loading && (
                <div className="avatar_component-loading">
                  <CircularProgress />
                </div>
              )}
              <Button aria-label="Agregar foto">
                <label htmlFor="avatar">
                  <AvatarComponent
                    srcImage={user.photoURL ? user.photoURL : undefined}
                    name={user.displayName || ""}
                  />
                </label>
              </Button>
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="btn-get-picture_input"
                onChange={() => {}}
                style={{ display: "none" }}
                multiple={false}
              />
              <div className="btn-group">
                <Button variant="contained" className="btn_btn-get-picture">
                  <label htmlFor="avatar" className="upload-label">
                    <FiUpload /> Subir imagen
                  </label>
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    className="btn-get-picture_input"
                    onChange={() => {}}
                    style={{ display: "none" }}
                    multiple={false}
                  />
                </Button>
                <Button variant="outlined" color="error" onClick={() => {}}>
                  Quitar
                </Button>
              </div>
            </div>
            <div className="form-required-inputs">
              <InputBasic
                required
                id="name"
                key="name"
                type="text"
                value={user.displayName || ""}
                onChange={() => {}}
                label="Nombre completo"
              />
              <InputBasic
                required
                id="email"
                key="email"
                type="email"
                label="Correo"
                value={user.email || ""}
                onChange={() => {}}
              />
              <div className="btn-group">
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  startIcon={<FiSave />}
                >
                  Guardar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  type="button"
                  onClick={() => {}}
                  startIcon={<FiXCircle />}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfilePage;
