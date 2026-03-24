import java.util.Scanner;

public class Examen_1er_Parcial {
  public static void main(String[] args) {
    String nombreComprador;
    double ancho;
    double largo;
    double area;
    String cDisplay = "Celanato: $%.2f (más $%.2f de IVA)";
    String mDisplay = "Marmolado: $%.2f (más $%.2f de IVA)";
    String aDisplay = "Acrilico: $%.2f (más $%.2f de IVA)";
    String proceedCompra;
    int materialInput;    
    String endSession;
    Scanner sc = new Scanner(System.in);

    System.out.println("CALCULAR COSTO DE COLOCACIÓN DE PISO:");
    do {
      System.out.println("Ingrese su nombre:");
      nombreComprador = sc.nextLine();
      System.out.println("Ingrese el ancho del piso en metros:");
      ancho = sc.nextDouble();
      System.out.println("Ingrese el largo del piso en metros:");
      largo = sc.nextDouble();
      area = ancho * largo;

      double areaC = area * 13.45;
      double areaCIVA = areaC * 0.16;
      String cFormat = String.format(cDisplay, areaC, areaCIVA);

      double areaM = area * 43.95;
      double areaMIVA = areaM * 0.16;
      String MFormat = String.format(mDisplay, areaM, areaMIVA);

      double areaA = area * 39.24;
      double areaAIVA = areaA * 0.16;
      String aFormat = String.format(aDisplay, areaA, areaAIVA);

      System.out.println("Los precios para los materiales disponibles son los siguientes:");

      System.out.println(cFormat);
      System.out.println(MFormat);
      System.out.println(aFormat);
      do {
        System.out.println("¿Desea proceder a la compra y obtener un descuento del 7.25%? (Y/N)");
        proceedCompra = sc.nextLine();
        if (proceedCompra != "Y" || proceedCompra != "N") {
          System.out.println("Opción no válida, intente de nuevo");
        }
      } while (proceedCompra != "Y" || proceedCompra != "N");
      
      String totalC = "Total: $%.2f";
      double precioC = areaCIVA * 0.9275;
      String ctFormat = String.format(totalC, precioC);

      String totalM = "Total: $%.2f";
      double precioM = areaMIVA * 0.9275;
      String mtFormat = String.format(totalM, precioM);

      String totalA = "Total: $%.2f";
      double precioA = areaAIVA * 0.9275;
      String atFormat = String.format(totalA, precioA);

      if (proceedCompra == "Y") {
        do {
          System.out.println("Elija la opción que corresponda al material del que estará hecho el piso:");
          System.out.println("1. Celanato\n2. Marmolado\n3. Acrílico");
          materialInput = sc.nextInt();
          switch (materialInput) {
            case 1:
              System.out.println(ctFormat);
              break;
            
            case 2:
              System.out.println(mtFormat);
              break;

            case 3:
              System.out.println(atFormat);
              break;
          
            default:
              System.out.println("Opción no válida, intente de nuevo");
              break;
          }
        } while (materialInput < 0 || materialInput > 4);
      }

      System.out.println(nombreComprador + ", su compra ha sido finalizada con éxito.");

      do {
          System.out.println("¿Finalizar sesión? (Y/N)");
        endSession = sc.nextLine();
        if (endSession != "Y" || endSession != "N") {
          System.out.println("Opción no válida, intente de nuevo");
        }
      } while (endSession != "Y" || endSession != "N");
    } while (endSession != "Y");
  }
}