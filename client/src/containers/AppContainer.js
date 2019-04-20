import { connect} from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => ({
    isLoading: state.companies.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role || null
});

export default connect(
    mapStateToProps
)(App);
