import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ModalComponent extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            isOpen: true
        }
    }

    render(){
        const {maxWidth, fullWidth, title, description, onClose, onClick}= this.props;
        const {isOpen} = this.state;
        return (
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={isOpen}
                aria-labelledby="max-width-dialog-title"
            >
            <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {description}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color="primary">
                Закрыть
            </Button>
            {onClick && 
                <Button onClick={onClick} color="primary">
                    Подтвердить
                </Button>
            }
            </DialogActions>
        </Dialog>
        );
    }
}

ModalComponent.propTypes = {
    maxWidth: PropTypes.oneOf(['sm', 'md', 'xs']),
    fullWidth: PropTypes.bool,
    description: PropTypes.string.isRequired,
    title: PropTypes.string,
};

ModalComponent.defaultProps = {
    maxWidth: 'sm',
    fullWidth: true,
    title: '',
}

export default ModalComponent;