using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//התוספת כדי לשלוח מייל
using System.Net;
using System.Net.Mail;

namespace CookitDB.DB_Code
{
    class Mail
    {
        //public static void main()
        //{
        //    SmtpClient cv = new SmtpClient("smtp.live.com", 25);
        //    cv.EnableSsl = true;
        //    cv.Credentials = new NetworkCredential("orlydanielov@gmail.com", "712946orlyd");
        //    try
        //    {
        //        cv.Send("orlydanielov@gmail.com", "omer_fridman6@hotmail.com", "test of sending mail from Cookit website", "Hi Omer. successfuly send mail from cookit.");//sender mail, reciver mail, subject, the message
        //        Console.WriteLine("email sent succesfully!.");
        //    }
        //    catch(Exception e)
        //    {
        //        Console.WriteLine("email can't sent.");
        //        Console.WriteLine(e.Message);
        //    }
        //}

        public static bool SendMail(string sender_mail, string reciver_mail, string subject, string message)
        {
            SmtpClient cv = new SmtpClient("smtp.gmail.com", 587);// new SmtpClient("smtp.live.com", 25);
            cv.EnableSsl = true;
            cv.Credentials = new NetworkCredential("orlydanielov@gmail.com", "712946orlyd");
            try
            {
                cv.Send(sender_mail, reciver_mail, subject, message);//sender mail, reciver mail, subject, the message
                Console.WriteLine("email sent succesfully!.");
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("email can't sent.");
                Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}
