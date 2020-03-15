import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Vote extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        disableVoting: this.props.disableVoting,
        voted: false
      }
      console.log(this.state)
  }

  onClick = () => {
      this.setState({voted: true});
  }

  modalBody() {
      return (
        <div class="votingBody">
            <p>Who won the debate?</p>
            <div className="modal-vote-row row">
                <div className="col">
                <Button variant="secondary" onClick={this.onClick}>
                    Kiran
                </Button>
                </div>
                <div className="col">
                    <p className="my-2">OR</p>
                </div>
                <div className="col">
                <Button variant="secondary" onClick={this.onClick}>
                    Patrin
                </Button>
                </div>
            </div>
        </div>
      )
  }

  votingMessage() {
      return (
        <div class="votingMessage">
            <p>
                Hang tight as we tally the votes! <br/>
                Click anywhere to close this modal!
            </p>
        </div>
      )
  }

    render(){
        return (
        <section class="gameContainer">
            <div class="text-center">
                <Button variant="primary" size="lg" disabled={this.state.disableVoting} onClick={() => {this.setState({modal: true, disableVoting: true})}}>Vote</Button>
                <Modal show={this.state.modal} onHide={() => {this.setState({modal: false})}} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Final Vote</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.voted ? this.votingMessage() : this.modalBody()}
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
        </section>
        )
    }
}

export default Vote;