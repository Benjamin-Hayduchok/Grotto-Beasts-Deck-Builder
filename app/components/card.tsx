import './../../styles/globals.css';

const Card = (props: 
        { name: string, cardText: string }
) => {
    const { name, cardText } = props;
        return (
            <div className="cardOuter">
                <div className="card">
                    name = { name }
                    cardText = { cardText }
                </div>
            </div>
        );
    }

export default Card
