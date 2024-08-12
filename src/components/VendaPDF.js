import { Divider, Image, Typography } from 'antd';
import { usePDF } from 'react-to-pdf';


const { Text, Title } = Typography;

const Component = ({ Orders }) => {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });


  return (
    <div>
      <button onClick={() => toPDF()}>Gerar Recibo Venda</button>
      <div ref={targetRef} style={{ position: 'absolute', left: '-9999px', padding: '20px', backgroundColor: '#f5f5f5', width: '210mm', height: '296mm' }}>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Image preview={false} src={process.env.PUBLIC_URL + '/LogoMagicVault.jpeg'} />
        </div>

         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ flex: 1, paddingRight: '10px' }}>


            <Text strong>Data:</Text> <Text>10/20/20</Text><br />
            <Text strong>Recibo Nº:</Text> <Text>00012345</Text><br />
            <Text strong>Emitido por:</Text> <Text>Magic Vault</Text>
          </div>
          <div style={{ flex: 1, paddingLeft: '10px' }}>

            <Text strong>Local:</Text> <Text>Porto Alegre, RS</Text><br />
            <Text strong>Telefone:</Text> <Text>(51) 1234-5678</Text><br />
            <Text strong>Website:</Text> <Text>www.magicvault.com</Text>
          </div>
        </div>

        <Divider />


        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ flex: 1, paddingRight: '10px' }}>
            <Title level={4} style={{ marginTop: '20px', color: '#555' }}>Informações sobre a Venda</Title>  
        </div>
        </div>

        <Divider />
        

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ flex: 1, paddingRight: '10px' }}>


            <Title level={4} style={{ marginTop: '20px', color: '#555' }}>Sobre o vendedor:</Title>
            <Text strong>Nome:</Text> <Text>{Orders.order_user[0].advertisement_id.seller.name} {Orders.order_user[0].advertisement_id.seller.surname}</Text><br />
            <Text strong>Avaliação do Vendedor:</Text> <Text>{Orders.order_user[0].advertisement_id.seller.ratings}</Text><br />
            <Text strong>Carta adquirida:</Text> <Text>{Orders.order_user[0].advertisement_id.card.name}</Text><br />
            <Text strong>Quantidade adquiridade:</Text> <Text>{Orders.order_user[0].quantity}</Text><br />
            <Text strong>Preço:</Text> <Text>{Orders.order_user[0].advertisement_id.price}</Text><br />
            <Text strong>Preço final :</Text> <Text>{Orders.order_user[0].advertisement_id.price * Orders.order_user[0].quantity}</Text><br />
            

          </div>
          <div style={{ flex: 1, paddingLeft: '10px' }}>
          IMAGEM não consegui botar

          </div>
        </div>

        <Divider />

        <div style={{ marginTop: '40px', textAlign: 'center', color: '#888' }}>
          <Text>Obrigado por escolher a Magic Vault!</Text><br />
          <Text>Este recibo foi gerado automaticamente e é válido sem assinatura física.</Text>
        </div>
        
       

        <Divider />
    </div>
    </div>
  );
};

export default Component;
