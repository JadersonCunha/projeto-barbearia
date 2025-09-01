document.addEventListener('DOMContentLoaded', () => {
    const barbeiros = document.querySelectorAll('.barb-img');
    const profissionalInput = document.getElementById('profissional');
    const servicoCheckboxes = document.querySelectorAll('.servico-checkbox');
    const servicoInput = document.getElementById('servico');

    barbeiros.forEach(barbeiro => {
        barbeiro.addEventListener('click', () => {
            const nomeBarbeiro = barbeiro.dataset.name;
            profissionalInput.value = nomeBarbeiro;
        });
    });

    servicoCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const servicosSelecionados = document.querySelectorAll('.servico-checkbox:checked');
            const nomesServicos = Array.from(servicosSelecionados).map(servico => servico.closest('tr').dataset.servico);
            servicoInput.value = nomesServicos.join(', ');
        });
    });

    document.getElementById('agendamento-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const form = e.target;
        const nome = form.querySelector('#nome').value;
        const telefone = form.querySelector('#telefone').value;
        const email = form.querySelector('#email').value;
        const data = form.querySelector('#data').value;
        const horario = form.querySelector('#horario').value;
        const profissional = form.querySelector('#profissional').value;
        const servico = form.querySelector('#servico').value;
        const messageElement = document.getElementById('agendamento-message');

        if (nome && telefone && email && data && horario && profissional && servico) {
            const whatsAppMessage = `Olá, gostaria de agendar um horário na Barbearia Alpha com o barbeiro ${profissional} para o(s) seguinte(s) serviço(s): ${servico}.
Nome: ${nome}
Telefone: ${telefone}
Email: ${email}
Data: ${data}
Horário: ${horario}`;

            const encodedMessage = encodeURIComponent(whatsAppMessage);
            const whatsappUrl = `https://wa.me/5551985330121?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');

            messageElement.textContent = "Agendamento enviado! Redirecionando para o WhatsApp...";
            messageElement.classList.remove('text-red-500');
            messageElement.classList.add('text-green-500');

            form.reset();
        } else {
            messageElement.textContent = "Por favor, preencha todos os campos e selecione um barbeiro e ao menos um serviço.";
            messageElement.classList.remove('text-green-500');
            messageElement.classList.add('text-red-500');
        }
    });

    document.getElementById('agendamento-form').addEventListener('reset', () => {
        profissionalInput.value = '';
        servicoInput.value = '';
        servicoCheckboxes.forEach(checkbox => checkbox.checked = false);
    });
});
