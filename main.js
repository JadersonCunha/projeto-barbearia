document.getElementById('agendamento-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const nome = form.querySelector('#nome').value;
    const telefone = form.querySelector('#telefone').value;
    const email = form.querySelector('#email').value;
    const data = form.querySelector('#data').value;
    const horario = form.querySelector('#horario').value;

    const messageElement = document.getElementById('agendamento-message');

    if (nome && telefone && email && data && horario) {
        // Aqui você enviaria os dados para um servidor, mas para este exemplo,
        // vamos apenas mostrar uma mensagem de sucesso.
        console.log('Agendamento enviado:', { nome, telefone, email, data, horario });
        
        // Constrói uma mensagem para ser enviada para o WhatsApp
        const whatsAppMessage = `Olá, gostaria de agendar um horário com a Barbearia Alpha.
Nome: ${nome}
Telefone: ${telefone}
Email: ${email}
Data: ${data}
Horário: ${horario}`;
        
        const encodedMessage = encodeURIComponent(whatsAppMessage);
        const whatsappUrl = `https://wa.me/5551985330121?text=${encodedMessage}`;
        
        // Abre o link do WhatsApp em uma nova aba
        window.open(whatsappUrl, '_blank');

        messageElement.textContent = "Agendamento enviado! Redirecionando para o WhatsApp...";
        messageElement.classList.remove('text-red-500');
        messageElement.classList.add('text-green-500');

        // Limpa o formulário
        form.reset();
    } else {
        messageElement.textContent = "Por favor, preencha todos os campos.";
        messageElement.classList.remove('text-green-500');
        messageElement.classList.add('text-red-500');
    }
});
