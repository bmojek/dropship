import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Polityka Prywatności</h1>

      <p className="mb-8">
        Dziękujemy za odwiedzenie naszej strony internetowej. Ochrona Twojej
        prywatności jest dla nas priorytetem. Poniżej przedstawiamy naszą
        politykę prywatności, wyjaśniającą, w jaki sposób zbieramy, używamy,
        udostępniamy i chronimy Twoje dane osobowe.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        1. Zbieranie i Użycie Danych Osobowych
      </h2>

      <p className="mb-4">
        <strong>1.1. Dane, które zbieramy:</strong> Podczas korzystania z naszej
        strony internetowej możemy zbierać różne rodzaje danych osobowych,
        jednakże informacje dotyczące płatności, takie jak dane karty
        kredytowej, nie są przez nas przechowywane ani przetwarzane. Te dane są
        zbierane bezpośrednio przez naszą bramkę płatności, Stripe.
      </p>

      <p className="mb-4">
        <strong>1.2. Sposób zbierania danych:</strong> Możemy zbierać dane
        osobowe od Ciebie bezpośrednio, gdy dobrowolnie nam je przekazujesz, na
        przykład podczas składania zamówienia, rejestracji na naszej stronie
        internetowej lub subskrypcji newslettera. Dane dotyczące płatności są
        zbierane przez naszą bramkę płatności, Stripe, w trakcie procesu
        płatności.
      </p>

      <p className="mb-4">
        <strong>1.3. Cel zbierania danych:</strong> Twoje dane osobowe mogą być
        wykorzystywane do przetwarzania zamówień, dostarczania produktów i
        usług, obsługi klienta, personalizacji doświadczeń zakupowych, analizy
        danych oraz wysyłania informacji marketingowych i promocyjnych.
      </p>

      {/* Kontynuuj resztę polityki prywatności zgodnie z oryginalnym szkicem */}

      <h2 className="text-2xl font-semibold mb-4">
        2. Udostępnianie Danych Osobowych
      </h2>

      <p className="mb-4">
        <strong>2.1. Udostępnianie stron trzecich:</strong> Możemy udostępniać
        Twoje dane osobowe podmiotom trzecim wyłącznie w celu realizacji usług,
        takich jak dostawa produktów, przetwarzanie płatności, analiza danych i
        marketing.
      </p>

      <p className="mb-4">
        <strong>2.2. Ograniczenia udostępniania danych:</strong> Nie
        sprzedajemy, nie wymieniamy ani nie udostępniamy Twoich danych osobowych
        innym stronom bez Twojej zgody, chyba że jest to niezbędne do
        świadczenia usług, do spełnienia wymogów prawnych lub w celach analizy
        danych.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        3. Ochrona Danych Osobowych
      </h2>

      <p className="mb-4">
        <strong>3.1. Bezpieczeństwo danych:</strong> Podjęliśmy odpowiednie
        środki techniczne i organizacyjne, aby chronić Twoje dane osobowe przed
        nieautoryzowanym dostępem, utratą, zmianą lub ujawnieniem.
      </p>

      <p className="mb-4">
        <strong>3.2. Przechowywanie danych:</strong> Twoje dane osobowe będą
        przechowywane tylko przez okres niezbędny do osiągnięcia celów, dla
        których zostały zebrane, lub zgodnie z obowiązującymi przepisami
        prawnymi.
      </p>

      <h2 className="text-2xl font-semibold mb-4">4. Pliki Cookie</h2>

      <p className="mb-4">
        <strong>4.1. Wykorzystanie plików cookie:</strong> Nasza strona
        internetowa może korzystać z plików cookie i innych technologii
        śledzących w celu ułatwienia nawigacji, personalizacji treści, analizy
        wydajności strony oraz śledzenia działań marketingowych.
      </p>

      <p className="mb-4">
        <strong>4.2. Zarządzanie plikami cookie:</strong> Możesz zmienić
        ustawienia plików cookie w swojej przeglądarce internetowej lub odrzucić
        pliki cookie, jednakże może to wpłynąć na funkcjonalność naszej strony
        internetowej.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        5. Zmiany w Polityce Prywatności
      </h2>

      <p className="mb-4">
        <strong>5.1. Aktualizacje polityki:</strong> Niniejsza polityka
        prywatności może być okresowo aktualizowana, aby odzwierciedlać zmiany w
        naszych praktykach dotyczących ochrony danych. Zalecamy regularne
        sprawdzanie tej strony w celu zapoznania się z najnowszymi informacjami.
      </p>

      <h2 className="text-2xl font-semibold mb-4">6. Kontakt</h2>

      <p className="mb-4">
        <strong>6.1. Pytania i kontakty:</strong> Jeśli masz jakiekolwiek
        pytania dotyczące naszej polityki prywatności lub sposobu przetwarzania
        Twoich danych osobowych, skontaktuj się z nami pod adresem [adres
        e-mail] lub za pośrednictwem formularza kontaktowego dostępnego na
        naszej stronie internetowej.
      </p>

      <p className="mb-4">
        Dziękujemy za zapoznanie się z naszą polityką prywatności.
      </p>

      <p>Ostatnia aktualizacja: [10.05.2024]</p>
    </div>
  );
};

export default PrivacyPolicy;
