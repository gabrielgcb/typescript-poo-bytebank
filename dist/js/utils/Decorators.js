export function ValidaTransacao(tipo) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (valor) {
            if (valor <= 0) {
                if (tipo === "debito") {
                    throw new Error("O valor a ser debitado precisa ser maior do que zero!");
                }
                else if (tipo === "deposito") {
                    throw new Error("O valor a ser depositado deve ser maior que zero!");
                }
            }
            if (tipo === "debito" && valor > this.saldo) {
                throw new Error("Seu saldo é insuficiente para realizar a operação!");
            }
            return originalMethod.apply(this, [valor]);
        };
        return descriptor;
    };
}
/*
export function ValidaDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (valorDoDebito: number) {
        if (valorDoDebito <= 0) {
            throw new Error("O valor a ser debitado precisa ser maior do que zero!");
        }
            
        if (valorDoDebito > this.saldo) {
            throw new Error("Seu saldo é insuficiente para realizar a operação!");
        }
            
        return originalMethod.apply(this, [valorDoDebito]);
    }
    
    return descriptor;
}

export function ValidaDeposito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (valorDoDeposito: number) {
        if (valorDoDeposito <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
            
        return originalMethod.apply(this, [valorDoDeposito]);
    }
    
    return descriptor;
}
*/ 
