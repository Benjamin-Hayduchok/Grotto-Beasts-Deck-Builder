import './../../styles/globals.css';

const Card = (props: 
        { name: string, cardText: string }
) => {
    const { name, cardText } = props;
        return (
            // <div className="cardOuter">
            //     <div className="card">
            //         name = { name }
            //         cardText = { cardText }
            //     </div>
            // </div>
                <div className="cardOuter">
                    card outer div
                    {/* <img src={image} alt="" /> */}
                    <div className="card">
                        <img src={name + ".webp"} alt="" />
                    </div>
                </div>
        );
    }

export default Card
