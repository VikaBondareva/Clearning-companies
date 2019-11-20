import React from 'react';
import Button from "@material-ui/core/Button";

export default  function ButtonsBooking({isAuth, isCompany,onClick }){
    const renderButtons = () => {
        if (isCompany) {
          return (
            <>
              {isAuth ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={()=>onClick("create")}
                >
                  Заказать уборку
                </Button>
              ) : (
                <>
                  <p>Сначало войдите в систему</p>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={()=>onClick("login")}
                  >
                    Войти
                  </Button>
                </>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={()=>onClick("pricing")}
              >
                Предваритульные цена и время уборки
              </Button>
            </>
          );
        }
        return (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={()=>onClick("chooseCompany")}
          >
            Рассмотреть предложения
          </Button>
        );
      };

    return renderButtons();
}