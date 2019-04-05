import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios'
import config from '../config/config';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    marginLeft: '2%',
    marginRight: '2%',    
    marginTop: '4%',
    width: 'auto'    
  },
  button: {
    margin: theme.spacing.unit,
  },  
  table: {
    minWidth: 500,
    maxWidth: 'auto',
  },
  tableWrapper: {
    overflowX: 'auto',
  }
});

class NotesTable extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      rows: [],
      page: 0,
      rowsPerPage: 5,
      open: false,
      id: '',
      title: '',
      content: ''
    }
  }

  openDialogEdit = (row) => {
    console.log(row);
    this.setState({open: true, id: row.id, title: row.title, content: row.content});    
  }

  updateNote = (id, payload) => {    
    axios.put(config.baseUrl + `${id}`, payload)
      .then(response => {
        this.setState({ open: false, id: "", title: "", content: ""});
        this.setRecords();
      })
      .catch(error => console.log(error));    
  }

  deleteNote = (noteId) => {
    axios.delete(config.baseUrl + `${noteId}`)
      .then(response => {        
        this.setRecords();
      })
      .catch(error => console.log(error));    
  }

  componentDidMount = () => {
    this.setRecords();
  }
  setRecords = () => {    
    axios.get(config.baseUrl)
      .then(response => {        
        this.setState({
          rows: response.status === 200 ? response.data.sort((a, b) => (a.id > b.id ? -1 : 1)) : []
        });
      })
      .catch(error => console.log(error));
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCloseWithoutChanges = () => {    
    this.setState({ open: false, id: "", title: "", content: ""});
        
  };  
  handleCloseWithChanges = () => {    
    let recordToEdit = {       
      title: this.state.title, 
      content: this.state.content
    }
    this.updateNote(this.state.id, recordToEdit);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Note ID</CustomTableCell>
                <CustomTableCell align="center">Title</CustomTableCell>
                <CustomTableCell align="center">Content</CustomTableCell>
                <CustomTableCell colSpan={2}  align="center" >Actions</CustomTableCell>                
              </TableRow>
            </TableHead>          
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="justify">{row.title}</TableCell>
                  <TableCell align="justify">{row.content}</TableCell>
                  <TableCell align="justify"> 
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className={classes.button} onClick={() => this.openDialogEdit(row)}>
                        Edit
                    </Button></TableCell>
                  <TableCell align="justify">
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      className={classes.button} onClick={() => this.deleteNote(row.id)}>
                        Delete
                    </Button></TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit record # {this.state.id}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              
              margin="dense"
              id="title"
              label="Title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange('title')}
              fullWidth
            />

            <TextField
              
              margin="dense"
              id="content"
              label="Content"
              type="text"
              fullWidth
              value={this.state.content}
              onChange={this.handleChange('content')}
            />            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseWithoutChanges} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseWithChanges} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

NotesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotesTable);
